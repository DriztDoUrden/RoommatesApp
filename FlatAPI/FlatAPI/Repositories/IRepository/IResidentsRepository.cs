using FlatAPI.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FlatAPI.Repositories.IRepository
{
    public interface IResidentsRepository
    {
        ResidentsViewModel GetResidentInfo(string residentID);
        bool CheckResidentFlat(string residentID);
    }
}