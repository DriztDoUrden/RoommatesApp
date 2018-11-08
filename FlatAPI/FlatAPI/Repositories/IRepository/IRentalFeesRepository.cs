using FlatAPI.Models.Domain;
using FlatAPI.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FlatAPI.Repositories.IRepository
{
    public interface IRentalFeesRepository
    {
        void CreateUtilityRate(UtilitiesRatesViewModel model);
        List<UtilitiesRatesViewModel> GetFlatUtilityRates();
        void RemoveUtility(UtilitiesRatesViewModel model);
        void CreateNewBill(BillsViewModel model);
        void RemoveBill(BillsViewModel model);
        List<BillsViewModel> GetFlatUtilityNumbers();
    }
}