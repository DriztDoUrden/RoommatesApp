using FlatAPI.Models.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FlatAPI.Models.CleaningScheduleCalendar
{
    public class Day
    {
        public DateTime Date { get; set; }
        public int DateNumber
        {
            get
            {
                return Date.Day;
            }
        }
        public Color Color { get; set; }
        public string NoticeContent { get; set; }
    }
}