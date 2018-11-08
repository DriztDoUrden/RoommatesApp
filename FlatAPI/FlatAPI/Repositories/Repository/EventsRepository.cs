using FlatAPI.Models;
using FlatAPI.Models.Domain;
using FlatAPI.Repositories.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FlatAPI.Repositories.Repository
{
    public class EventsRepository : IEventsRepository
    {

        private readonly ApplicationDbContext _context;

        public EventsRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public void CreateEvent(Events model)
        {
            model.Date = DateTime.Now;
            model.Flat_Id = _context.GetCurrentFlatID();
            model.User_Id = _context.GetCurrentUserID();
            _context.Events.Add(model);
            _context.SaveChanges();
        }

        public List<Events> GetEvents()
        {
            var flatID = _context.GetCurrentFlatID();
            return _context.Events.Where(x => x.Flat_Id == flatID).ToList();
        }

        public void ModifyEvent(Events model)
        {
            throw new NotImplementedException();
        }

        public void RemoveEvent(Events model)
        {
            throw new NotImplementedException();
        }
    }
}