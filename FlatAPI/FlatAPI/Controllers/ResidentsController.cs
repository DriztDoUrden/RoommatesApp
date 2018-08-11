using FlatAPI.Models.Domain;
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
    [Authorize]
    [RoutePrefix("api/Residents")]
    public class ResidentsController : ApiController
    {
        private readonly IFlatsRepository _flatContext;
        private readonly IResidentsRepository _residentsContext;

        public ResidentsController(IFlatsRepository flatContext, IResidentsRepository residentsContext)
        {
            _flatContext = flatContext;
            _residentsContext = residentsContext;
        }

        [HttpGet]
        [Route("ResidentInfo")]
        public async Task<IHttpActionResult> CurrentResidentInfo()
        {
            ApplicationUser user = await HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>().FindByIdAsync(System.Web.HttpContext.Current.User.Identity.GetUserId());
            var resident = _residentsContext.GetResidentInfo(user.Id);
            return Ok(resident);
        }

        [HttpGet]
        [Route("CheckResidentFlat")]
        public bool CheckResidentFlat()
        {
            ApplicationUser user = HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>().FindById(System.Web.HttpContext.Current.User.Identity.GetUserId());

            var hasFlat = _residentsContext.CheckResidentFlat(user.Id);
            return hasFlat;
        }
    }
}
