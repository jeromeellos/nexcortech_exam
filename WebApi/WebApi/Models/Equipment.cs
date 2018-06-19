using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class Equipment: _BaseClass
    {
        public string EquipmentName { get; set; }
        public string EquipmentLocation { get; set; }
        public DateTime? Purchased { get; set; }
        public double? PurchasePrice { get; set; }
    }
}
