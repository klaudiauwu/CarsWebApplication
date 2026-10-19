using Cars.Domain;
using Cars.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Cars.API.Controllers;

public class CarsController : BaseApiController
{
    private readonly DataContext _context;

    public CarsController(DataContext context)
    {
        _context = context;
    }

    // Zadanie 2: Odczyt wszystkich samochodów[cite: 2]
    [HttpGet]
    public async Task<ActionResult<List<Car>>> GetCars()
    {
        return await _context.Cars.AsNoTracking().ToListAsync();
    }

    // Zadanie 2: Odczyt jednego samochodu po ID[cite: 2]
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<Car>> GetCar(Guid id)
    {
        var car = await _context.Cars.AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == id);

        if (car is null) return NotFound();

        return car;
    }

    // Zadanie 3: Dodawanie nowego samochodu (POST)[cite: 2]
    [HttpPost]
    public async Task<ActionResult<Car>> CreateCar(Car car)
    {
        _context.Cars.Add(car);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetCar), new { id = car.Id }, car);
    }

    // Zadanie 3: Aktualizacja istniejącego samochodu (PUT)[cite: 2, 3]
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> UpdateCar(Guid id, Car car)
    {
        var existingCar = await _context.Cars.FindAsync(id);

        if (existingCar is null) return NotFound();

        existingCar.Brand = car.Brand;
        existingCar.Model = car.Model;
        existingCar.DoorsNumber = car.DoorsNumber;
        existingCar.LuggageCapacity = car.LuggageCapacity;
        existingCar.EngineCapacity = car.EngineCapacity;
        existingCar.FuelType = car.FuelType;
        existingCar.ProductionDate = car.ProductionDate;
        existingCar.AverageFuelConsumption = car.AverageFuelConsumption;
        existingCar.BodyType = car.BodyType;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    // Zadanie 3: Usuwanie samochodu (DELETE)[cite: 3]
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteCar(Guid id)
    {
        var car = await _context.Cars.FindAsync(id);

        if (car is null) return NotFound();

        _context.Cars.Remove(car);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}