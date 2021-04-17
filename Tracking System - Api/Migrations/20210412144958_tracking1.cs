using Microsoft.EntityFrameworkCore.Migrations;

namespace Tracking_System___Api.Migrations
{
    public partial class tracking1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "EndId",
                table: "Trips",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "StartId",
                table: "Trips",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "location",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    latitude = table.Column<double>(type: "float", nullable: false),
                    longitude = table.Column<double>(type: "float", nullable: false),
                    accuracy = table.Column<double>(type: "float", nullable: false),
                    TripId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_location", x => x.Id);
                    table.ForeignKey(
                        name: "FK_location_Trips_TripId",
                        column: x => x.TripId,
                        principalTable: "Trips",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Trips_EndId",
                table: "Trips",
                column: "EndId");

            migrationBuilder.CreateIndex(
                name: "IX_Trips_StartId",
                table: "Trips",
                column: "StartId");

            migrationBuilder.CreateIndex(
                name: "IX_location_TripId",
                table: "location",
                column: "TripId");

            migrationBuilder.AddForeignKey(
                name: "FK_Trips_location_EndId",
                table: "Trips",
                column: "EndId",
                principalTable: "location",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Trips_location_StartId",
                table: "Trips",
                column: "StartId",
                principalTable: "location",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Trips_location_EndId",
                table: "Trips");

            migrationBuilder.DropForeignKey(
                name: "FK_Trips_location_StartId",
                table: "Trips");

            migrationBuilder.DropTable(
                name: "location");

            migrationBuilder.DropIndex(
                name: "IX_Trips_EndId",
                table: "Trips");

            migrationBuilder.DropIndex(
                name: "IX_Trips_StartId",
                table: "Trips");

            migrationBuilder.DropColumn(
                name: "EndId",
                table: "Trips");

            migrationBuilder.DropColumn(
                name: "StartId",
                table: "Trips");
        }
    }
}
