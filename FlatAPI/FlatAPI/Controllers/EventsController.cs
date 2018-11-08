using FlatAPI.Models.Domain;
using FlatAPI.Repositories.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace FlatAPI.Controllers
{
    [Authorize]
    [RoutePrefix("api/events")]
    public class EventsController : ApiController
    {
        private readonly IEventsRepository _eventsContext;

        public EventsController(IEventsRepository eventsContext)
        {
            _eventsContext = eventsContext;
        }

        [HttpPost]
        [Route("CreateEvent")]
        public IHttpActionResult CreateEvent(Events model)
        {
            _eventsContext.CreateEvent(model);
            return Ok();
        }

        [HttpGet]
        [Route("GetEvents")]
        public IHttpActionResult GetEvents(Events model)
        {
            var events = _eventsContext.GetEvents().OrderBy(x=>x.Date);
            return Ok(events);
        }
    }
}
