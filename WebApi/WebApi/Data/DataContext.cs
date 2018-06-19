using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Equipment>().ToTable("tblMaster");
            modelBuilder.Entity<EquipmentActivity>().ToTable("tblDetail");
            modelBuilder.Entity<User>().ToTable("tblUser");
        }

        public DbSet<Equipment> EquipmentList { get; set; }
        public DbSet<EquipmentActivity> EquipmentActivityList { get; set; }
        public DbSet<User> UserList { get; set; }
    }
}
