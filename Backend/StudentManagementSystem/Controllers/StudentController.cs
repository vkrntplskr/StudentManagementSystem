using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentManagementSystem.Models;

namespace StudentManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly StudentDBContext _context;

        public StudentController(StudentDBContext context)
        {
            _context = context;
        }

        // GET: api/student  List all students
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var students = await _context.Students.ToListAsync();
            return Ok(students);
        }

        // GET: api/student/{id}    Get single student
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var student = await _context.Students.FindAsync(id);

            if (student == null)
                return NotFound(new { Message = "Student not found" });

            return Ok(student);
        }

        // POST: api/student    Insert new student
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Student student)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState); // validation errors

            _context.Students.Add(student);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get),
                new { id = student.StudentId }, student);
        }

        // PUT: api/student/{id}   Update student
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Student student)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existing = await _context.Students.FindAsync(id);

            if (existing == null)
                return NotFound(new { Message = "Student not found" });

            // Update only required fields
            existing.FullName = student.FullName;
            existing.Email = student.Email;
            existing.Mobile = student.Mobile;
            existing.City = student.City;

            await _context.SaveChangesAsync();
            return Ok(new { Message = "Student updated successfully" });
        }

        // DELETE: api/student/{id}   → Delete student
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var student = await _context.Students.FindAsync(id);

            if (student == null)
                return NotFound(new { Message = "Student not found" });

            _context.Students.Remove(student);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Student deleted successfully" });
        }
    }
}