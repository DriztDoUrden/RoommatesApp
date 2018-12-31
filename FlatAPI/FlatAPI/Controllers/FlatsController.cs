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
using FlatAPI.Models;
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

        public FlatsController(IFlatsRepository flatContext)
        {
            _flatContext = flatContext;
        }

        [HttpPost]
        [Route("CreateFlat")]
        public async Task<IHttpActionResult> CreateFlat(FlatViewModel model)
        {
            var entity = Mapper.Map<FlatViewModel, Flat>(model);
            try
            {
                _flatContext.CreateFlat(entity);
            }
            catch(ValidationException ex)
            {
                return ResponseMessage(Request.CreateResponse(HttpStatusCode.BadRequest, ex.ListOfErrors));
            }
            return Ok(entity);
        }
        [HttpPost]
        [Route("JoinToFlat")]
        public async Task<IHttpActionResult> JoinToFlat([FromBody]int flatID)
        {
            var entity = new Residents
            {
                Flat_Id = flatID
            };
            _flatContext.JoinToFlat(entity);
            _flatContext.SaveChanges();

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

    }
}
