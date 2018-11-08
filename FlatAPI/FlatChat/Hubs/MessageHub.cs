using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace FlatChat.Hubs
{
    public class MessageHub : Hub
    {
        public async Task Send(Message message)
        {
            if(message.Content == null)
            {
                message.Content = "";
                message.Date = DateTime.Now;
            }
            await Clients.All.SendAsync("Send", message);
        }
    }
}
