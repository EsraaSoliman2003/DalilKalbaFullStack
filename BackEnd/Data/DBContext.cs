using System;
using Microsoft.EntityFrameworkCore;
using DalilKalba.Models;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace DalilKalba.Data
{
    public class DalilKalbaContext : DbContext
    {
        public DalilKalbaContext(DbContextOptions<DalilKalbaContext> options) : base(options) { }

        public DbSet<Post> Posts { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<News> News { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Seed default admin
            modelBuilder.Entity<Admin>().HasData(
                new Admin
                {
                    Id = 1,
                    Username = "admin",
                    Password = "12345"
                }
            );

            // Seed default news
            modelBuilder.Entity<News>().HasData(
                new News
                {
                    Id = 1,
                    Text = "افتتاح ممشى كلباء الجديد على الواجهة البحرية",
                    CreatedAt = new DateTime(2025, 8, 25)
                }
            );

            // Seed example posts
            modelBuilder.Entity<Post>().HasData(
                new Post
                {
                    Id = 1,
                    Title = "محمية القرم",
                    Content = "واحدة من أهم المحميات الطبيعية في الدولة وتضم تنوعاً بيئياً غنياً.",
                    IsFeatured = False,
                    ImageUrl = "https://images.pexels.com/photos/6780348/pexels-photo-6780348.jpeg",
                    CreatedAt = new DateTime(2025, 8, 25)
                },
                new Post
                {
                    Id = 2,
                    Title = "شاطئ كلباء",
                    Content = "شاطئ هادئ يتميز بمياهه النقية وإطلالاته الرائعة على خليج عمان.",
                    IsFeatured = False,
                    ImageUrl = "https://www.propertyfinder.ae/blog/wp-content/uploads/2025/06/01-72.webp",
                    CreatedAt = new DateTime(2025, 8, 25)
                },
                new Post
                {
                    Id = 3,
                    Title = "بحيرة كلباء",
                    Content = "بحيرة كلباء هادئة وجميلة تحيط بها الطبيعة الخلابة",
                    IsFeatured = False,
                    ImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Kalba_Fort.jpg/500px-Kalba_Fort.jpg",
                    CreatedAt = new DateTime(2025, 8, 25)
                }
            );
        }
    }
}
