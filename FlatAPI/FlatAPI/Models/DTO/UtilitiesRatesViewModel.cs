using FlatAPI.Models.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FlatAPI.Models.DTO
{
    public class UtilitiesRatesViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public decimal FixedCharge { get; set; }
        public Flat Flat { get; set; }
    }
}