using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FlatAPI.Models.Domain;
using FlatAPI.Models.DTO;

namespace FlatAPI.Repositories.IRepository
{
    public interface IFlatsRepository
    {
        void CreateFlat(Flat flat);
        void JoinToFlat(Residents resident);
        List<Flat> SearchFlat(FlatViewModel flat);
        Flat GetFlatByID(int flatID);
        void SaveChanges();
    }
}