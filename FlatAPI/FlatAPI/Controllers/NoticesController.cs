using FlatAPI.Models.Domain;
using FlatAPI.Models.DTO;
using FlatAPI.Repositories.IRepository;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace FlatAPI.Controllers
{
    [RoutePrefix("api/Notices")]
    public class NoticesController : ApiController
    {
        private readonly IAdvertisementRepository _advertisementContext;

        public NoticesController(IAdvertisementRepository advertisementContext)
        {
            _advertisementContext = advertisementContext;
        }

        [HttpPost]
        [Route("CreateNotice")]
        public IHttpActionResult CreateNotice(AdvertisementViewModel model)
        {
            _advertisementContext.CreateNotice(model);
            return Ok();
        }
        [HttpGet]
        [Route("GetNotices")]
        public IHttpActionResult GetNotices()
        {
            var notices = _advertisementContext.GetNotices();
            return Ok(notices);
        }
        [HttpPost]
        [Route("EditNotice")]
        public IHttpActionResult EditNotice(AdvertisementViewModel notice)
        {
            _advertisementContext.EditNotice(notice);
            return Ok();
        }
        [HttpPost]
        [Route("RemoveNotice")]
        public IHttpActionResult RemoveNotice(AdvertisementViewModel notice)
        {
            _advertisementContext.RemoveNotice(notice);
            return Ok();
        }

    }
}
