using FlatAPI.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FlatAPI.Repositories.IRepository
{
    public interface IAdvertisementRepository
    {
        void CreateNotice(AdvertisementViewModel ad);
        List<AdvertisementViewModel> GetNotices();
        void EditNotice(AdvertisementViewModel advertisement);
        void RemoveNotice(AdvertisementViewModel advertisement);
    }
}