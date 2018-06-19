using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class Config
    {
        public Config() { }

        public string DBConnectionStr { get; set; }
        public string DBName { get; set; }
        
    }
}
