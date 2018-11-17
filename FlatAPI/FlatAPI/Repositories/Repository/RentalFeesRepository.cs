using AutoMapper;
using FlatAPI.Models;
using FlatAPI.Models.Domain;
using FlatAPI.Models.DTO;
using FlatAPI.Models.Enums;
using FlatAPI.Repositories.IRepository;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Globalization;
using System.Linq;
using System.Web;

namespace FlatAPI.Repositories.Repository
{
    public class RentalFeesRepository : IRentalFeesRepository
    {
        private readonly ApplicationDbContext _context;
        public RentalFeesRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public void CreateUtilityRate(UtilitiesRatesViewModel model)
        {
            var newUtility = Mapper.Map<UtilitiesRatesViewModel, UtilitiesRates>(model);
            newUtility.Flat_Id = _context.GetCurrentFlatID();
            _context.UtilitiesRates.Add(newUtility);
            SaveChanges();
            RefreshBills(newUtility, Modes.Add);
        }
        public List<UtilitiesRatesViewModel> GetFlatUtilityRates()
        {
            var flatId = _context.GetCurrentFlatID();
            var utilities = _context.UtilitiesRates.Where(x => x.Flat_Id == flatId).ToList();
            var utilitiesVM = Mapper.Map<List<UtilitiesRates>, List<UtilitiesRatesViewModel>>(utilities);
            return utilitiesVM;
        }
        public List<BillsViewModel> GetFlatUtilityNumbers()
        {
            var flatId = _context.GetCurrentFlatID();
            var utilities = _context.UtilitiesNumbers.Where(x => x.Flat_Id == flatId)
                .GroupBy(x => x.Date).Select(x => x.ToList()).ToList();
            List<BillsViewModel> bills = new List<BillsViewModel>();
            CultureInfo ci = new CultureInfo("en-US");
            foreach (var list in utilities)
            {
                bills.Add(Mapper.Map<List<UtilitiesNumbers>, BillsViewModel>(list));
                bills.Last().UtilitiesDate = bills.Last().Utilities.First().Date;
                bills.Last().UtilitiesMonth = bills.Last().UtilitiesDate.ToString("MMMM", ci);
            }
            return bills;
        }
        public void RemoveUtility(UtilitiesRatesViewModel model)
        {
            var utility = Mapper.Map<UtilitiesRatesViewModel, UtilitiesRates>(model);
            RefreshBills(utility, Modes.Remove);
            _context.UtilitiesRates.Attach(utility);
            _context.UtilitiesRates.Remove(utility);
            SaveChanges();
        }

        public void RemoveBill(BillsViewModel model)
        {
            var idsList = model.Utilities.Select(x => x.Id).ToList();
            foreach(var id in idsList)
            {
                var utility = _context.UtilitiesNumbers.First(x => x.Id == id);
                _context.UtilitiesNumbers.Remove(utility);
            }
            SaveChanges();
        }
        public void CreateNewBill(BillsViewModel model)
        {
            foreach(var utility in model.Utilities)
            {
                utility.Date = model.UtilitiesDate;
                utility.Flat_Id = _context.GetCurrentFlatID();
                utility.UtilitiesRates = _context.UtilitiesRates.Single(x => x.Id == utility.UtilitiesRates.Id);
                _context.UtilitiesNumbers.Add(utility);
                SaveChanges();
            }
        }
        private void RefreshBills(UtilitiesRates rate, Modes mode)
        {
            var flatID = _context.GetCurrentFlatID();
            var utilitiesNumbers = _context.UtilitiesNumbers;
            var utilitiesDates = utilitiesNumbers.GroupBy(x => x.Date).Select(x=>x.Key).ToList();
            if (mode == Modes.Add)
            {
                foreach (var date in utilitiesDates)
                {
                    var utilityNumber = new UtilitiesNumbers
                    {
                        Date = date,
                        Flat_Id = flatID,
                        Quantity = 0,
                        UtilitiesRates = rate
                    };
                    _context.UtilitiesNumbers.Add(utilityNumber);
                }
            }
            else if(mode == Modes.Remove)
            {
                var utilities = utilitiesNumbers.Where(x => x.UtilitiesRates.Id == rate.Id).ToList();
                foreach (var utility in utilities)
                {
                    _context.UtilitiesNumbers.Remove(utility);
                }
            }
            SaveChanges();

        }

        public void CreateTip()
        {

        }

        private List<UtilitiesRates> GetCurrentUtilities()
        {
            var currentFlatID = _context.GetCurrentFlatID();
            var utilities = _context.UtilitiesRates.AsNoTracking().Where(x => x.Flat.Id == currentFlatID).ToList();
            return utilities;
        }
        private void SaveChanges()
        {
            _context.SaveChanges();
        }

    }
}