const form = document.getElementById('patientForm');
const patientList = document.getElementById('patientList');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
        const formData = {
            name: document.getElementById('name').value.trim(),
            sickness: document.getElementById('sickness').value.trim(),
            date_admitted: document.getElementById('date_admitted').value,
            date_discharged: document.getElementById('date_discharged').value
        };

        // Input validation
        if (!validateFormData(formData)) {
            throw new Error('Please fill in all required fields correctly');
        }

        const response = await fetch('http://localhost:3000/patients', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        await loadPatients();
        form.reset();
        showNotification('Patient added successfully', 'success');
    } catch (error) {
        console.error('Error:', error);
        showNotification(error.message, 'error');
    }
});

async function loadPatients() {
    try {
        const response = await fetch('http://localhost:3000/patients');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const patients = await response.json();
        patientList.innerHTML = patients
            .map(patient => createPatientCard(patient))
            .join('');
    } catch (error) {
        console.error('Error loading patients:', error);
        showNotification('Failed to load patients', 'error');
    }
}

function createPatientCard(patient) {
    return `
        <tr>
            <td>${escapeHtml(patient.name)}</td>
            <td>${escapeHtml(patient.sickness)}</td>
            <td>${formatDate(patient.date_admitted)}</td>
            <td>
                <span class="badge ${patient.date_discharged ? 'bg-success' : 'bg-primary'}">
                    ${patient.date_discharged ? 'Discharged' : 'Active'}
                </span>
            </td>
        </tr>
    `;
}

// Utility functions
function validateFormData(data) {
    return data.name && data.sickness && data.date_admitted &&
           new Date(data.date_admitted) <= new Date() &&
           (!data.date_discharged || new Date(data.date_discharged) >= new Date(data.date_admitted));
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString();
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// Initial load
loadPatients();
