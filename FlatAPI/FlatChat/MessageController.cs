using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlatChat.Hubs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FlatChat
{
    [Route("api/message")]
    public class MessageController : Controller
    {
        private IHubContext<MessageHub> _messageHubContext;

        public MessageController(IHubContext<MessageHub> messageHubContext)
        {
            _messageHubContext = messageHubContext;
        }

        public IActionResult Post()
        {
            _messageHubContext.Clients.All.SendAsync("Send", "Hello from server");
            return Ok("HYHY");
        }
    }
}
