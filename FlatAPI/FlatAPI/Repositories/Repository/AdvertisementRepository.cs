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
            var userFlat = _context.Residents.FirstOrDefault(x => x.User.Id == entity.User.Id).Flat;
            entity.User = ReloadUser(entity.User); 
            entity.Flat = userFlat;
            _context.Advertisements.Add(entity);
            SaveChanges();
        }
        public List<AdvertisementViewModel> GetNotices(string userID)
        {
            var flat = _context.Residents.FirstOrDefault(x => x.User.Id == userID).Flat;
            var notices = _context.Advertisements.Where(x => x.Flat.Id == flat.Id).ToList();
            return Mapper.Map<List<Advertisement>, List<AdvertisementViewModel>>(notices);
        }
        public void EditNotice(AdvertisementViewModel advertisement)
        {
            var notice = _context.Advertisements.FirstOrDefault(x => x.Id == advertisement.Id);
            ReloadAdvertisement(advertisement, notice);
            SaveChanges();
        }
        public void RemoveNotice(AdvertisementViewModel advertisement)
        {
            var ad = Mapper.Map<AdvertisementViewModel, Advertisement>(advertisement);
            _context.Advertisements.Attach(ad);
            _context.Advertisements.Remove(ad);
            SaveChanges();
        }
        private void ReloadAdvertisement(AdvertisementViewModel previousAd, Advertisement editedAd)
        {

            editedAd.Author = previousAd.Author;
            editedAd.Content = previousAd.Content;
            editedAd.Flat.Id = previousAd.Flat.Id;
            editedAd.Flat.Address = previousAd.Flat.Address;
            editedAd.Flat.City = previousAd.Flat.City;
            editedAd.Flat.FlatName = previousAd.Flat.FlatName;
            editedAd.Flat.FlatAvatar = previousAd.Flat.FlatAvatar;
            editedAd.Title = previousAd.Title;
        }
        private ApplicationUser ReloadUser(ApplicationUser obj)
        {
            return _context.Users.FirstOrDefault(x => x.Id == obj.Id);
        }
        private void SaveChanges()
        {
            _context.SaveChanges();
        }
    }
}