using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FlatAPI.Models.CleaningScheduleCalendar
{
    public class Month
    {
        public List<Day> Days { get; set; }
        public int StartDay { get; set; }
        public string MonthName
        {
            get
            {
                return System.Globalization.CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(Days[0].Date.Month);
            }
        }

    }
}