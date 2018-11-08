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
    public class AdvertisementRepository: IAdvertisementRepository
    {
        private readonly ApplicationDbContext _context;

        public AdvertisementRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public void CreateNotice(AdvertisementViewModel ad)
        {
            var entity = Mapper.Map<AdvertisementViewModel, Advertisement>(ad);
            entity.User_Id = _context.GetCurrentUserID();
            entity.Flat_Id = _context.GetCurrentFlatID();
            _context.Advertisements.Add(entity);
            SaveChanges();
        }
        public List<AdvertisementViewModel> GetNotices()
        {
            var flatId = _context.GetCurrentFlatID();
            var notices = _context.Advertisements.Where(x => x.Flat.Id == flatId).ToList();
            return Mapper.Map<List<Advertisement>, List<AdvertisementViewModel>>(notices);
        }
        public void EditNotice(AdvertisementViewModel advertisement)
        {
            var ad = Mapper.Map<AdvertisementViewModel, Advertisement>(advertisement);
            var notice = _context.Advertisements.FirstOrDefault(x => x.Id == advertisement.Id);
            notice.Author = ad.Author;
            notice.Content = ad.Content;
            notice.Title = ad.Title;
            SaveChanges();
        }
        public void RemoveNotice(AdvertisementViewModel advertisement)
        {
            var ad = Mapper.Map<AdvertisementViewModel, Advertisement>(advertisement);
            _context.Advertisements.Attach(ad);
            _context.Advertisements.Remove(ad);
            SaveChanges();
        }
        private void SaveChanges()
        {
            _context.SaveChanges();
        }
    }
}