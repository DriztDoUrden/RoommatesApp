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
        private readonly IFlatsRepository _flatContext;
        private readonly IResidentsRepository _residentsContext;

        public NoticesController(IFlatsRepository flatContext, IResidentsRepository residentsContext
            ,IAdvertisementRepository advertisementContext)
        {
            _flatContext = flatContext;
            _residentsContext = residentsContext;
            _advertisementContext = advertisementContext;
        }

        [HttpPost]
        [Route("CreateNotice")]
        public async Task<IHttpActionResult> CreateNotice(AdvertisementViewModel model)
        {
            ApplicationUser user = await HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>().FindByIdAsync(System.Web.HttpContext.Current.User.Identity.GetUserId());
            model.User = user;
            _advertisementContext.CreateNotice(model);
            return Ok();
        }
        [HttpGet]
        [Route("GetNotices")]
        public async Task<IHttpActionResult> GetNotices()
        {
            ApplicationUser user = await HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>().FindByIdAsync(System.Web.HttpContext.Current.User.Identity.GetUserId());
            var notices = _advertisementContext.GetNotices(user.Id);
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
