using AutoMapper;
using FlatAPI.Models;
using FlatAPI.Models.Domain;
using FlatAPI.Models.DTO;
using FlatAPI.Repositories.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FlatAPI.Repositories.Repository
{
    public class ResidentsRepository : IResidentsRepository
    {
        private readonly ApplicationDbContext _context;

        public ResidentsRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public ResidentsViewModel GetResidentInfo(string residentID)
        {
            var resident = _context.Residents.FirstOrDefault(x => x.User.Id == residentID);
            return Mapper.Map<Residents, ResidentsViewModel>(resident);
        }

        public bool CheckResidentFlat(string residentID)
        {
            var isHomeless = _context.Residents.FirstOrDefault(x => x.User.Id == residentID);
            if (isHomeless == null) return false;
            else return true;
        }

        public List<ApplicationUser> GetCurrentFlatMembers()
        {
            var flatID = _context.GetCurrentFlatID();
            var members = _context.Residents.Where(x => x.Flat.Id == flatID).Select(x => x.User).ToList();
            return members;
        }
    }
}