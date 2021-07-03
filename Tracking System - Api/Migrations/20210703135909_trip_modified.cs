using Microsoft.EntityFrameworkCore.Migrations;

namespace Tracking_System___Api.Migrations
{
    public partial class trip_modified : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Trips_customers_CustomerId",
                table: "Trips");

            migrationBuilder.DropIndex(
                name: "IX_Trips_CustomerId",
                table: "Trips");

            migrationBuilder.DropColumn(
                name: "CustomerId",
                table: "Trips");

            migrationBuilder.AddColumn<string>(
                name: "CustomerAdress",
                table: "Trips",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CustomerName",
                table: "Trips",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CustomerPhone",
                table: "Trips",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CustomerRegion",
                table: "Trips",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CustomerAdress",
                table: "Trips");

            migrationBuilder.DropColumn(
                name: "CustomerName",
                table: "Trips");

            migrationBuilder.DropColumn(
                name: "CustomerPhone",
                table: "Trips");

            migrationBuilder.DropColumn(
                name: "CustomerRegion",
                table: "Trips");

            migrationBuilder.AddColumn<int>(
                name: "CustomerId",
                table: "Trips",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Trips_CustomerId",
                table: "Trips",
                column: "CustomerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Trips_customers_CustomerId",
                table: "Trips",
                column: "CustomerId",
                principalTable: "customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
