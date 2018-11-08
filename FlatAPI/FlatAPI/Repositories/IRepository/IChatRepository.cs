using FlatAPI.Models.Domain;
using FlatAPI.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FlatAPI.Repositories.IRepository
{
    public interface IChatRepository
    {
        void SaveMessage(string message);
        List<MessageViewModel> GetMessages();
    }
}