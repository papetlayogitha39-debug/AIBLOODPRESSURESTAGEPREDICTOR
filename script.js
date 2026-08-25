document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Dynamic Graph Animation in Hero
    const sysValueEl = document.querySelector('.sys-value');
    const diaValueEl = document.querySelector('.dia-value');

    // Simple number fluctuation animation
    setInterval(() => {
        const baseSys = 118;
        const baseDia = 76;
        
        // Random fluctuation between -2 and +2
        const varSys = Math.floor(Math.random() * 5) - 2;
        const varDia = Math.floor(Math.random() * 5) - 2;
        
        sysValueEl.textContent = baseSys + varSys;
        diaValueEl.textContent = baseDia + varDia;
    }, 2500);

    // Predictor Logic
    const form = document.getElementById('bpForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    const btnText = form.querySelector('.btn-text');
    const spinner = form.querySelector('.spinner');
    
    const resultArea = document.getElementById('resultArea');
    const resultCategory = document.getElementById('resultCategory');
    const resultMessage = document.getElementById('resultMessage');
    const resetBtn = document.getElementById('resetBtn');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const sys = parseInt(document.getElementById('systolic').value);
        const dia = parseInt(document.getElementById('diastolic').value);

        if (isNaN(sys) || isNaN(dia)) return;

        // UI Loading State
        btnText.classList.add('hidden');
        spinner.classList.remove('hidden');
        submitBtn.disabled = true;

        // Simulate AI Processing Time
        setTimeout(() => {
            btnText.classList.remove('hidden');
            spinner.classList.add('hidden');
            submitBtn.disabled = false;

            showResult(sys, dia);
        }, 1500);
    });

    function showResult(sys, dia) {
        let category = '';
        let colorClass = '';
        let message = '';

        if (sys >= 180 || dia >= 120) {
            category = 'Hypertensive Crisis';
            colorClass = '#991b1b';
            message = 'URGENT: Your readings indicate a Hypertensive Crisis. Please seek immediate medical attention.';
        } else if (sys >= 140 || dia >= 90) {
            category = 'High BP (Stage 2)';
            colorClass = '#ef4444';
            message = 'Your blood pressure is in Hypertension Stage 2. It is highly recommended to consult a doctor for a medical plan.';
        } else if ((sys >= 130 && sys <= 139) || (dia >= 80 && dia <= 89)) {
            category = 'High BP (Stage 1)';
            colorClass = '#f97316';
            message = 'Your blood pressure is in Hypertension Stage 1. Consider lifestyle modifications and consulting your healthcare provider.';
        } else if (sys >= 120 && sys <= 129 && dia < 80) {
            category = 'Elevated';
            colorClass = '#f59e0b';
            message = 'Your blood pressure is elevated. Proactive lifestyle changes can help prevent progression to hypertension.';
        } else if (sys < 120 && dia < 80) {
            category = 'Normal';
            colorClass = '#10b981';
            message = 'Great! Your blood pressure is in the normal range. Maintain your healthy habits.';
        } else {
             // Fallback for edge cases (e.g., very low BP)
             category = 'Check Vitals';
             colorClass = '#64748b';
             message = 'Your readings are unusual. Please ensure you entered them correctly or consult a doctor if you feel unwell.';
        }

        // Update UI
        resultCategory.textContent = category;
        resultCategory.style.color = colorClass;
        resultCategory.style.borderColor = colorClass;
        resultCategory.style.background = `${colorClass}20`; // 20 hex is 12% opacity
        
        resultMessage.textContent = message;
        
        // Show result area
        resultArea.classList.add('active');
    }

    resetBtn.addEventListener('click', () => {
        resultArea.classList.remove('active');
        form.reset();
    });
});
