document.addEventListener('DOMContentLoaded', function () {
    async function fetchAddress(cep) {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            if (!response.ok) throw new Error('Erro ao buscar o endereço.');
            const data = await response.json();
            if (data.erro) throw new Error('CEP inválido.');
            return data;
        } catch (error) {
            alert(error.message);
            return null;
        }
    }

    const cepInput = document.getElementById('cep');
    if (cepInput) {
        cepInput.addEventListener('input', async function () {
            const cep = this.value.replace(/\D/g, '');
            if (cep.length === 8) {
                const addressData = await fetchAddress(cep);
                if (addressData) {
                    document.getElementById('address').value = addressData.logradouro || '';
                    document.getElementById('city').value = addressData.localidade || '';
                    document.getElementById('state').value = addressData.uf || '';
                }
            }
        });
    }

    function validateCheckout() {
        const ageCheckbox = document.getElementById('age-confirmation');
        if (!ageCheckbox.checked) {
            document.getElementById('error-message').style.display = 'block';
            return false;
        }
        return true;
    }

    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function (event) {
            event.preventDefault();
            if (!validateCheckout()) return;

            const urlParams = new URLSearchParams(window.location.search);
            const productUrl = urlParams.get('paymentUrl');
            if (productUrl) {
                window.location.href = productUrl;
            } else {
                alert('Erro: Não foi possível encontrar o link de pagamento.');
            }
        });
    }
});
