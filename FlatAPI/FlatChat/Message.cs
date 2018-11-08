using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlatChat
{
    public class Message
    {
        public string Content { get; set; }
        public string UserName { get; set; }
        public DateTime Date { get; set; }
    }
}
