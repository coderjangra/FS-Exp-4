/**
 * Mock API Service simulating Spring Boot REST API
 * Demonstrates: Layered architecture (Controller > Service > Repository)
 * Integrates Exception Handling, API Versioning, and DTO Validation delays
 */

const defaultDB = [
  { id: 1, firstName: 'Aria', lastName: 'Vance', email: 'aria@quantum.api', department: 'Engineering', role: 'Senior Developer', status: 'ACTIVE' },
  { id: 2, firstName: 'Kael', lastName: 'Thorne', email: 'kael@quantum.api', department: 'Security', role: 'Analyst', status: 'ON_LEAVE' },
  { id: 3, firstName: 'Lyra', lastName: 'Nova', email: 'lyra@quantum.api', department: 'HR', role: 'Director', status: 'ACTIVE' },
];

let database = [];
try {
  const saved = localStorage.getItem('fs4_employees');
  if (saved) {
    database = JSON.parse(saved);
  } else {
    database = [...defaultDB];
  }
} catch (e) {
  database = [...defaultDB];
}

const saveDB = () => {
  localStorage.setItem('fs4_employees', JSON.stringify(database));
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Simulates API interceptors handling versioning
export const fetchEmployees = async (version = 'v1') => {
  await delay(600); // Simulate network latency
  
  if (version === 'v2') {
    // V2 API formats data differently
    return {
      status: 200,
      metadata: { total: database.length, version: 'v2' },
      data: database.map(emp => ({
        empId: emp.id,
        fullName: `${emp.firstName} ${emp.lastName}`,
        contact: emp.email,
        dept: emp.department,
        active: emp.status === 'ACTIVE'
      }))
    };
  }
  
  // V1 API format
  return {
    status: 200,
    data: [...database]
  };
};

export const getEmployee = async (id) => {
  await delay(400);
  const emp = database.find(e => e.id === id);
  if (!emp) {
    throw { response: { status: 404, data: { message: "EmployeeNotFoundException: Employee with ID " + id + " not found in database." } } };
  }
  return { status: 200, data: emp };
};

// Common validation logic for Create/Update
const validateDto = (dto) => {
  const errors = [];
  if (!dto.firstName || dto.firstName.length < 2) {
    errors.push("First name must be at least 2 characters.");
  }
  if (!dto.lastName || dto.lastName.length < 2) {
    errors.push("Last name must be at least 2 characters.");
  }
  if (!dto.email || !dto.email.includes('@')) {
    errors.push("Invalid email format.");
  }
  return errors;
};

// Simulates POST Request with DTO Validation and Exception Handling
export const createEmployee = async (dto) => {
  await delay(800);
  const errors = validateDto(dto);
  
  if (errors.length > 0) {
    // Simulating Spring Boot MethodArgumentNotValidException response
    throw {
      response: {
        status: 400,
        data: {
          timestamp: new Date().toISOString(),
          status: 400,
          error: "Bad Request",
          message: "Validation Failed",
          details: errors
        }
      }
    };
  }

  // Simulate JPA/Hibernate saving to database
  const newEmp = {
    id: Date.now(),
    ...dto,
    status: dto.status || 'ACTIVE'
  };
  
  database.push(newEmp);
  saveDB();
  return { status: 201, data: newEmp };
};

// Simulates PUT Request with DTO Validation
export const updateEmployee = async (id, dto) => {
  await delay(800);
  const errors = validateDto(dto);
  
  if (errors.length > 0) {
    throw {
      response: {
        status: 400,
        data: {
          timestamp: new Date().toISOString(),
          status: 400,
          error: "Bad Request",
          message: "Validation Failed",
          details: errors
        }
      }
    };
  }

  const index = database.findIndex(e => e.id === id);
  if (index === -1) {
    throw { response: { status: 404, data: { message: "EmployeeNotFoundException" } } };
  }

  // Simulate JPA/Hibernate update
  const updatedEmp = {
    ...database[index],
    ...dto,
    status: dto.status || database[index].status
  };
  
  database[index] = updatedEmp;
  saveDB();
  return { status: 200, data: updatedEmp };
};

export const deleteEmployee = async (id) => {
  await delay(500);
  const initialLength = database.length;
  database = database.filter(e => e.id !== id);
  
  if (database.length === initialLength) {
    throw { response: { status: 404, data: { message: "ResourceNotFoundException" } } };
  }
  
  saveDB();
  return { status: 204 };
};
