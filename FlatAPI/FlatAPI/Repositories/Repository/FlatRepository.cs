using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Transactions;
using System.Web;
using FlatAPI.Models;
using FlatAPI.Models.Domain;
using FlatAPI.Models.DTO;
using FlatAPI.Repositories.IRepository;
using Microsoft.AspNet.Identity;

namespace FlatAPI.Repositories.Repository
{
    public class FlatRepository : IFlatsRepository
    {
        private readonly ApplicationDbContext _context;

        public FlatRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public void CreateFlat(Flat flat)
        {
            var userId = _context.GetCurrentUserID();
            var resident = new Residents
            {
                User_Id = userId
            };
            using (TransactionScope scope = new TransactionScope())
            {
                _context.Flats.Add(flat);
                SaveChanges();// necessary, to generate ID for entity
                resident.Flat_Id = flat.Id;
                JoinToFlat(resident);
                SaveChanges();
                scope.Complete();
            }
        }
        public void JoinToFlat(Residents resident)
        {
            resident.User_Id = _context.GetCurrentUserID();
            _context.Residents.Add(resident);
        }
        public List<Flat> SearchFlat(FlatViewModel flat)
        {
            var obj = _context.Flats.Where(x => (x.Address.ToLower().Equals(flat.Address.ToLower())
                                        || x.City.ToLower().Equals(flat.City.ToLower()))
                                        || x.FlatName.ToLower().Equals(flat.FlatName.ToLower())).ToList();
            return obj;
        }
        public Flat GetFlatByID(int flatID)
        {
            return _context.Flats.FirstOrDefault(x => x.Id == flatID);
        }
        public void SaveChanges()
        {
            try
            {
                _context.SaveChanges();
            }
            catch (DbEntityValidationException ex)
            {
                var listOfErrors = GlobalMethodsService.GetErrorsFromException(ex);
                throw new ValidationException(listOfErrors);
            }
        }
        public ApplicationUser FillUserByMail(string email)
        {
            return _context.Users.FirstOrDefault(x => x.Email == email);
        }
        public Flat GetCurrentFlat()
        {
            var user = GetCurrentUser();
            var flat = _context.Residents.FirstOrDefault(x => x.User.Id == user.Id).Flat;
            return flat;
        }
        private ApplicationUser GetCurrentUser()
        {
            var userID = HttpContext.Current.User.Identity.GetUserId();
            var user = _context.Users.FirstOrDefault(x => x.Id == userID);
            return user;
        }
    }
}