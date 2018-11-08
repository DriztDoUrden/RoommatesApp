using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FlatAPI.Models
{
    public class ValidationException : Exception
    {
        public ValidationException(List<string> errorsList)
        {
            ListOfErrors = errorsList;
        }
        public List<string> ListOfErrors { get; set; }
    }
}