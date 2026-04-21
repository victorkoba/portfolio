# 🚀 Portfolio & Mail API
Este repositório contém o código-fonte do meu portfólio pessoal e da micro-API de mensageria que sustenta o formulário de contato.

---

# 🛠️ Tecnologias Utilizadas
### Frontend
- HTML & CSS: Estrutura semântica e estilização responsiva.
- JavaScript: Manipulação de DOM e integração assíncrona com a API.

### Backend e Infaestrutura
- Python + FastAPI: Construção da API de envio de e-mails.
- GitHub Actions: Pipeline de CI/CD configurada para rodar testes automatizados a cada push.
- Render: Hospedagem para a API em produção.

---

# ⚙️ Arquitetura de CI/CD
Para garantir que a aplicação em produção nunca sofra interrupções por erros de código, implementei um fluxo de integração contínua:

- Desenvolvimento: Alterações são feitas localmente.
- Pull Request / Push: O GitHub Actions é disparado automaticamente.
- Automated Testing: O Pytest executa a suíte de testes da API.
- Deployment: Se (e somente se) todos os testes passarem, o código é liberado para o Render.

Nota: Isso evita o "quebrar em produção", garantindo que apenas builds estáveis cheguem ao usuário final.

---

# 📬 Contato
Se você gostou do projeto ou quer bater um papo sobre desenvolvimento, sinta-se à vontade para me encontrar:

- LinkedIn: https://www.linkedin.com/in/victor-koba/

- E-mail: victorkoba08@gmail.com
