using FlatAPI.Models;
using FlatAPI.Models.CleaningScheduleCalendar;
using FlatAPI.Models.Domain;
using FlatAPI.Repositories.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FlatAPI.Repositories.Repository
{
    public class CleaningRepository :ICleaningRepository
    {
        private readonly ApplicationDbContext _context;

        public CleaningRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public void CreateSchedule(CleaningSchedule model)
        {
            model.FlatID = _context.GetCurrentFlatID();
            _context.CleaningSchedule.Add(model);
            _context.SaveChanges();
        }

        public Month GetMonth(int year, int month)
        {
            var startDate = new DateTime(year, month, 1);
            int daysInMonth = DateTime.DaysInMonth(year, month);
            var days = new List<DateTime>();
            for(int i = 0; i < daysInMonth; i++)
            {
                days.Add(startDate.AddDays(i));
            }
            var months = new Month();
            months.Days = new List<Day>();
            foreach(var day in days)
            {
                var tempDay = new Day();
                tempDay.Date = day;
                months.Days.Add(tempDay);
            }
            months.StartDay = (int)(months.Days.First().Date.DayOfWeek + 6) % 7;
            FillColor(months,year);
            return months;
        }

        private List<DateTime> GetDaysFromRange(DateTime start, DateTime end)
        {
            var startDate = new DateTime(start.Year, start.Month, start.Day);
            var endDate = new DateTime(end.Year, end.Month, end.Day);
            var days = new List<DateTime>();

            for (DateTime day = startDate; day <= endDate;)
            {
                days.Add(day);
                day = day.AddDays(1);
            }
            return days;
        }

        private void FillColor(Month month, int year)
        {
            var monthNumber = month.Days[0].Date.Month;
            var schedule = _context.CleaningSchedule.Where(x => x.From.Month == monthNumber && x.From.Year == year).ToList();
            foreach (var note in schedule)
            {
                var days = GetDaysFromRange(note.From, note.To);
                var userColor = _context.Users.Single(x => x.Id == note.UserID).Color;
                foreach (var day in days)
                {
                    month.Days.Single(x => x.Date == day).Color = userColor;
                }
            }
        }

    }
}