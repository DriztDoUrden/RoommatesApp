using FlatAPI.Repositories.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FlatAPI.Controllers
{
    [RoutePrefix("api/Chat")]
    public class ChatController : ApiController
    {
        private readonly IFlatsRepository _flatContext;
        private readonly IResidentsRepository _residentsContext;
        private readonly ICleaningRepository _cleaningRepository;
        private readonly IChatRepository _chatRepository;

        public ChatController(IFlatsRepository flatContext, IResidentsRepository residentsContext,
                ICleaningRepository cleaningRepository, IChatRepository chatRepository)
        {
            _flatContext = flatContext;
            _residentsContext = residentsContext;
            _cleaningRepository = cleaningRepository;
            _chatRepository = chatRepository;
        }

        [HttpPost]
        [Route("SaveMessage")]
        public IHttpActionResult SaveMessage(MessageModel message)
        {
            _chatRepository.SaveMessage(message.Content);
            return Ok();
        }
        [HttpGet]
        [Route("GetMessages")]
        public IHttpActionResult GetMessages()
        {
            var messages = _chatRepository.GetMessages();
            return Ok(messages);
        }

    }

    public class MessageModel
    {
        public string Content { get; set; }
    }
}
