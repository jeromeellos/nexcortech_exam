using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public abstract class _BaseClass
    {
        public int ID { get; set; }
        public bool Active { get; set; }
        public int? EnteredBY { get; set; }
        public DateTime EnteredOn { get; set; }
        public int? LastUpdateBY { get; set; }
        public DateTime LastUpdateOn { get; set; }
    }
}
