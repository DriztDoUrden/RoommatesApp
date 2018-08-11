using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Web;
using FlatAPI.Models;
using FlatAPI.Models.Domain;
using FlatAPI.Models.DTO;
using FlatAPI.Repositories.IRepository;

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
            _context.Flats.Add(flat);
        }
        public void JoinToFlat(Residents resident)
        {
            var user = FillUserByMail(resident.User.Email);
            resident.User = user;
            _context.Residents.Add(resident);
        }
        public List<Flat> SearchFlat(FlatViewModel flat)
        {
            var obj = _context.Flats.Where(x => (x.Address.ToLower().Equals(flat.Address.ToLower())
                                        && x.City.ToLower().Equals(flat.City.ToLower()))
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
                
            }
        }
        public ApplicationUser FillUserByMail(string email)
        {
            return _context.Users.FirstOrDefault(x => x.Email == email);
        }


    }
}