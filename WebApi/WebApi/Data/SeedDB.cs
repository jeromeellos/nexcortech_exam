using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public static class SeedDB
    {
        public static void Initialize(DataContext context)
        {
            context.Database.EnsureCreated();


            if (context.UserList.Any())
            {
                return;   // DB has been seeded
            }

            var users = new User[]
            {
                new User{Email="admin@nextcortech.com",Name="Admin",Password="", Active = true, EnteredOn = DateTime.Now},
            };
            var equipment = new Equipment[]
            {
                new Equipment{EquipmentName = "Bulldozer 001", EquipmentLocation="Dozing Fleet", Purchased = DateTime.Now, PurchasePrice = 12000000, Active = true, EnteredBY = 1, EnteredOn = DateTime.Now},
                 new Equipment{EquipmentName = "Bulldozer 002", EquipmentLocation="Dozing Fleet", Purchased = DateTime.Now, PurchasePrice = 12000000, Active = true, EnteredBY = 1, EnteredOn = DateTime.Now},
            };

            foreach (var s in users)
            {
                context.UserList.Add(s);
            }
            context.SaveChanges();
            
            foreach (var e in equipment)
            {
                context.EquipmentList.Add(e);
            }
            context.SaveChanges();
            
        }

    }
}
