using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Web;

namespace FlatAPI.Repositories
{
    public static class GlobalMethodsService
    {
        public static List<String> GetErrorsFromException(DbEntityValidationException ex)
        {
            var listOfErrors = new List<string>();
            foreach (var errorsList in ex.EntityValidationErrors)
            {
                foreach (var error in errorsList.ValidationErrors)
                {
                    listOfErrors.Add(error.ErrorMessage);
                }
            }
            return listOfErrors;
        }
    }
}