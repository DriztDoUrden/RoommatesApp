using FlatAPI.Models.CleaningScheduleCalendar;
using FlatAPI.Models.Domain;
using FlatAPI.Repositories.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FlatAPI.Controllers
{
    [Authorize]
    [RoutePrefix("api/cleaning")]
    public class CleaningController : ApiController
    {
        private readonly IFlatsRepository _flatContext;
        private readonly IResidentsRepository _residentsContext;
        private readonly ICleaningRepository _cleaningRepository;

        public CleaningController(IFlatsRepository flatContext, IResidentsRepository residentsContext, ICleaningRepository cleaningRepository)
        {
            _flatContext = flatContext;
            _residentsContext = residentsContext;
            _cleaningRepository = cleaningRepository;
        }

        [HttpPost]
        [Route("GetMonth")]
        public IHttpActionResult GetMonth(YearMonthDate date)
        {
            var days = _cleaningRepository.GetMonth(date.Year, date.Month+1);
            return Ok(days);
        }

        [HttpPost]
        [Route("CreateSchedule")]
        public IHttpActionResult CreateSchedule(CleaningSchedule schedule)
        {
            _cleaningRepository.CreateSchedule(schedule);
            return Ok();
        }
    }
}
