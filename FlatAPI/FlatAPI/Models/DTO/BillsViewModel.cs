using FlatAPI.Models.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FlatAPI.Models.DTO
{
    public class BillsViewModel
    {
        public int Id { get; set; }
        public List<UtilitiesNumbers> Utilities { get; set; }
        public Flat Flat { get; set; }
        public string UtilitiesMonth { get; set; }
        public DateTime UtilitiesDate { get; set; }

    }
}