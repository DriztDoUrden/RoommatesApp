using FlatAPI.Models.CleaningScheduleCalendar;
using FlatAPI.Models.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FlatAPI.Repositories.IRepository
{
    public interface ICleaningRepository
    {
        Month GetMonth(int year, int month);
        void CreateSchedule(CleaningSchedule model);
        void CreateScheduleNote(CleaningScheduleNote note);
    }
}