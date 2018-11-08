using FlatAPI.Models.DTO;
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
    [RoutePrefix("api/RentalFees")]
    public class RentalFeesController : ApiController
    {
        private readonly IRentalFeesRepository _rentalFeesContext;

        public RentalFeesController(IRentalFeesRepository rentalFeesContext)
        {
            _rentalFeesContext = rentalFeesContext;
        }

        [HttpPost]
        [Route("CreateUtility")]
        public IHttpActionResult CreateUtility(UtilitiesRatesViewModel model)
        {
            _rentalFeesContext.CreateUtilityRate(model);
            return Ok();
        }
        [HttpGet]
        [Route("GetFlatUtilities")]
        public IHttpActionResult GetFlatUtilities()
        {
            var utilities = _rentalFeesContext.GetFlatUtilityRates();
            return Ok(utilities);
        }
        [HttpPost]
        [Route("RemoveUtility")]
        public IHttpActionResult RemoveUtility(UtilitiesRatesViewModel model)
        {
            _rentalFeesContext.RemoveUtility(model);
            return Ok();
        }
        [HttpPost]
        [Route("CreateBill")]
        public IHttpActionResult CreateBill(BillsViewModel model)
        {
            _rentalFeesContext.CreateNewBill(model);
            return Ok();
        }
        [HttpPost]
        [Route("RemoveBill")]
        public IHttpActionResult RemoveBill(BillsViewModel model)
        {
            _rentalFeesContext.RemoveBill(model);
            return Ok();
        }
        [HttpGet]
        [Route("GetFlatUtilityNumbers")]
        public IHttpActionResult GetFlatUtilityNumbers()
        {
            var utilities = _rentalFeesContext.GetFlatUtilityNumbers();
            return Ok(utilities);
        }

    }
}
