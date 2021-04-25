using Microsoft.EntityFrameworkCore.Migrations;

namespace Tracking_System___Api.Migrations
{
    public partial class editCustomer : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "customers");

            migrationBuilder.RenameColumn(
                name: "Image",
                table: "drivers",
                newName: "Url");

            migrationBuilder.AlterColumn<string>(
                name: "Phone",
                table: "drivers",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AddColumn<string>(
                name: "Phone",
                table: "customers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Phone",
                table: "customers");

            migrationBuilder.RenameColumn(
                name: "Url",
                table: "drivers",
                newName: "Image");

            migrationBuilder.AlterColumn<long>(
                name: "Phone",
                table: "drivers",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<long>(
                name: "PhoneNumber",
                table: "customers",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }
    }
}
