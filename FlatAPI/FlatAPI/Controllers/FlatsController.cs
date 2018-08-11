using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Transactions;
using System.Web;
using System.Web.Http;
using AutoMapper;
using FlatAPI.Models.Domain;
using FlatAPI.Models.DTO;
using FlatAPI.Repositories.IRepository;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;

namespace FlatAPI.Controllers
{

    [Authorize]
    [RoutePrefix("api/Flats")]
    public class FlatsController : ApiController
    {
        private readonly IFlatsRepository _flatContext;
        private readonly IResidentsRepository _residentsContext;

        public FlatsController(IFlatsRepository flatContext, IResidentsRepository residentsContext)
        {
            _flatContext = flatContext;
            _residentsContext = residentsContext;
        }

        [HttpPost]
        [Route("CreateFlat")]
        public async Task<IHttpActionResult> CreateFlat(FlatViewModel model)
        {
            ApplicationUser user = await HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>().FindByIdAsync(System.Web.HttpContext.Current.User.Identity.GetUserId());

            var entity = Mapper.Map<FlatViewModel, Flat>(model);
            var resident = new Residents
            {
                Flat = entity,
                User = user
            };
            using (TransactionScope scope = new TransactionScope())
            {
                _flatContext.CreateFlat(entity);
                _flatContext.SaveChanges(); // necessary, to generate ID for entity
                _flatContext.JoinToFlat(resident);
                _flatContext.SaveChanges();
                scope.Complete();
            }
            return Ok(entity);
        }
        [HttpPost]
        [Route("JoinToFlat")]
        public async Task<IHttpActionResult> JoinToFlat([FromBody]int flatID)
        {
            ApplicationUser user = await HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>().FindByIdAsync(System.Web.HttpContext.Current.User.Identity.GetUserId());

            var flat = _flatContext.GetFlatByID(flatID);
            var model = new ResidentsViewModel
            {
                Flat = flat
            };
            var entity = Mapper.Map<ResidentsViewModel, Residents>(model);
            entity.User = user;

            using (TransactionScope scope = new TransactionScope())
            {
                _flatContext.JoinToFlat(entity);
                _flatContext.SaveChanges();
                scope.Complete();
            }
            return Ok();
        }
        [HttpPost]
        [Route("SearchFlat")]
        public IHttpActionResult SearchFlat(FlatViewModel model)
        {
            var flats = _flatContext.SearchFlat(model);
            var flatsVM = Mapper.Map<List<Flat>, List<FlatViewModel>>(flats);
            return Ok(flatsVM);
        }

        // GET api/values/5
        public string Get(int id)
        {
            return "value";
        }

    }
}
