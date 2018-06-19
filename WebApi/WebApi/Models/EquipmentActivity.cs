using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class EquipmentActivity : _BaseClass
    {
        public int EquipmentID { get; set; }
        public virtual Equipment Equipment { get; set; }

        public DateTime ActivityDate { get; set; }
        public string Activity { get; set; }
        public bool ActivityComplete { get; set; }
        public DateTime? CompletedOn { get; set; }
        public string CompletedBy { get; set; }

    }
}
