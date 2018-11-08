using AutoMapper;
using FlatAPI.Models;
using FlatAPI.Models.Domain;
using FlatAPI.Models.DTO;
using FlatAPI.Repositories.IRepository;
using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Web;

namespace FlatAPI.Repositories.Repository
{
    public class ChatRepository : IChatRepository
    {
        private readonly ApplicationDbContext _context;

        public ChatRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public List<MessageViewModel> GetMessages()
        {
            var flatID = _context.GetCurrentFlatID();
            var messages = _context.ChatMessages.Where(x => x.Flat_Id == flatID).OrderBy(x=>x.Date).ToList();
            var messagesVM = new List<MessageViewModel>();
            foreach(var message in messages)
            {
                messagesVM.Add(Mapper.Map<ChatMessage, MessageViewModel>(message));
            }
            AddUserNames(messagesVM);
            return messagesVM;
        }

        public void SaveMessage(string messageContext)
        {
            if (messageContext != null)
            {
                var message = new ChatMessage
                {
                    Date = DateTime.Now,
                    Flat_Id = _context.GetCurrentFlatID(),
                    Content = messageContext,
                    User_Id = _context.GetCurrentUserID()
                };
                _context.ChatMessages.Add(message);
                SaveChanges();
            }
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

        public void AddUserNames(List<MessageViewModel> messages)
        {
            foreach(var message in messages)
            {
                var userName = _context.Users.Single(x => x.Id == message.User_Id).Email;
                message.UserName = userName;
            }
        }

    }
}