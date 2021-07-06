using Microsoft.EntityFrameworkCore.Migrations;

namespace Tracking_System___Api.Migrations
{
    public partial class deleteCustomerAddress : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CustomerAdress",
                table: "Trips");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CustomerAdress",
                table: "Trips",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
