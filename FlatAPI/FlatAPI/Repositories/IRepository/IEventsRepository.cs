using FlatAPI.Models.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FlatAPI.Repositories.IRepository
{
    public interface IEventsRepository
    {
        void CreateEvent(Events model);
        void ModifyEvent(Events model);
        void RemoveEvent(Events model);
        List<Events> GetEvents();
    }
}