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
                    Title = "Cute Cat Sleeping",
                    Content = "This is a cute cat taking a nap in the sun.",
                    ImageUrl = "https://i.pinimg.com/1200x/2e/a9/33/2ea933dbf75a6b85472899202e55d2d3.jpg",
                    CreatedAt = new DateTime(2025, 8, 25)
                },
                new Post
                {
                    Id = 2,
                    Title = "Playful Kitten",
                    Content = "A playful kitten enjoying some toys.",
                    ImageUrl = "https://i.pinimg.com/736x/11/d0/7d/11d07d167d79721d75ae651c367e96b0.jpg",
                    CreatedAt = new DateTime(2025, 8, 25)
                }
            );
        }
    }
}
