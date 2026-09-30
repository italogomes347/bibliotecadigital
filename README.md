# Biblioteca Digital

Uma aplicação web de biblioteca digital feita com HTML, CSS e JavaScript puro. O projeto reúne catálogo de livros, área de leitura, perfil de usuário e ferramentas administrativas em uma interface responsiva.

## Acessar o site

O site está publicado pelo GitHub Pages. Abra a URL configurada em **Settings → Pages** no repositório.

## Recursos

- Catálogo com busca, filtros, detalhes e capas personalizáveis.
- Conta de leitor com favoritos, lista de desejos, progresso de leitura e pedidos.
- Painel administrativo para gerenciar livros, estoque, usuários, capas, cupons e identidade visual.
- Personalização de paletas, cores, tipografia, cantos dos cartões e modo claro/escuro.
- Comunicados administrativos com opção de destaque no topo da página.
- Atualização em tempo real entre abas do mesmo navegador para as alterações administrativas.
- Lista de usuários e total no painel Admin atualizados quando uma conta é criada em outra aba do mesmo navegador.
- Dados guardados localmente no navegador.

## Executar localmente

1. Baixe ou clone este repositório.
2. Abra `index.html` em um navegador ou use uma extensão de servidor local, como Live Server.

Não é necessário instalar dependências nem configurar um backend.

## Publicação no GitHub Pages

1. No repositório do GitHub, abra **Settings → Pages**.
2. Em **Build and deployment**, selecione **Deploy from a branch**.
3. Escolha a branch publicada e a pasta que contém `index.html` (geralmente `/ (root)`).
4. Salve e aguarde o GitHub Pages disponibilizar o endereço do site.

O projeto é estático e pode ser publicado sem processo de build.

## Segurança, armazenamento e limitações

Este projeto é uma demonstração estática, sem servidor de autenticação ou banco de dados. As contas, senhas, permissões e dados no navegador não têm proteção real: o JavaScript pode ser inspecionado, alterado ou contornado. **Não use senhas reutilizadas, dados pessoais, pagamentos ou informações reais.**

Não são criadas contas administrativas ou de demonstração com credenciais padrão. Se ainda não houver Admin neste navegador, a tela de entrada oferece uma configuração inicial com nome de usuário e senha escolhidos pelo proprietário. Essa conta e suas permissões ficam apenas no armazenamento local do navegador; visitantes podem inspecionar ou modificar o código e os dados, e cada navegador pode ter uma conta diferente. Esse fluxo é apenas para demonstração local, não protege um site público. Para autenticação administrativa real, use um backend.

O conteúdo e as configurações são armazenados no `localStorage` do navegador. A sincronização em tempo real — inclusive novos cadastros exibidos no painel Admin — funciona entre abas do mesmo navegador e perfil, mas não entre dispositivos ou navegadores diferentes. Comunicados também são locais e não são notificações push. Limpar os dados do navegador pode apagar as informações salvas. Para contas reais, é necessário migrar para um backend com autenticação e banco de dados.

As capas podem ser personalizadas no painel administrativo por URL HTTPS ou upload de imagem.

## Backup e recuperação

1. Entre na conta e abra **Configurações → Privacidade e dados**.
2. Selecione **Exportar backup** e guarde o arquivo JSON em um local privado, de preferência fora do dispositivo.
3. Para recuperar os dados, abra o mesmo site no navegador desejado, escolha **Importar backup** e selecione o arquivo.
4. A restauração substitui os dados locais atuais e encerra a sessão; depois, entre novamente com uma conta que esteja no backup.

O backup JSON não é criptografado e contém os dados salvos pelo site neste navegador, inclusive contas e senhas deste projeto demonstrativo. Não compartilhe o arquivo. Exporte um backup antes de limpar os dados do navegador, trocar de perfil ou dispositivo. A restauração só afeta o navegador em que o arquivo for importado; não há sincronização em nuvem.

## Estrutura

```text
.
├── assets/       # Logo e ícone
├── css/          # Estilos base, temas e layout
├── js/           # Catálogo, armazenamento, interface e recursos
└── index.html    # Página de entrada
```

## Tecnologias

- HTML
- CSS
- JavaScript

## Prompt de criação dos estilos CSS

O texto a seguir é um prompt reconstruído para descrever o objetivo e os requisitos visuais do CSS atual. Ele não é um registro literal garantido do prompt original:

> Crie um sistema completo de estilos CSS para uma biblioteca digital feita com HTML, CSS e JavaScript puro, publicada como site estático no GitHub Pages. A interface deve ser moderna, editorial, acolhedora e funcional, com aparência própria e sóbria; evite a estética genérica de templates, excesso de gradientes, brilhos, animações chamativas e emojis decorativos. Priorize leitura confortável, hierarquia visual clara, conteúdo fácil de encontrar e uma experiência consistente em todas as telas.
>
> Defina tokens CSS reutilizáveis para fundo da página, superfícies e cartões, texto principal e secundário, bordas, cores primárias e de ação, estados de sucesso e erro, sombras, raio dos cantos, tipografia e espaçamentos. Use fontes de sistema como alternativas, sem exigir serviços externos. Mantenha contraste suficiente entre texto e fundo, inclusive em botões, campos, notificações temporárias, tabelas e componentes desabilitados.
>
> Estilize a aplicação inteira: tela de carregamento e sua transição de saída; autenticação e cadastro em layout próprio, incluindo modo de acesso Admin e configuração inicial; estrutura principal com navegação lateral rolável, usuário, botão de sair, barra superior fixa, pesquisa, ações da conta e conteúdo; página inicial, catálogo e grade de livros com capas; filtros, paginação, favoritos e lista de desejos; detalhes do livro, leitura, pedidos, comunidade e resenhas; perfil e edição da conta; configurações; carrinho e checkout demonstrativo; tabelas, painéis, indicadores e abas de administração para usuários, catálogo, estoque, capas, pedidos, cupons, aparência e comunicados; modais, paleta de comandos, rodapé e mensagens toast.
>
> Faça o layout adaptar-se a telas grandes, tablets e celulares: reorganize grades e painéis, permita rolagem horizontal segura em tabelas quando necessário, transforme a navegação lateral em menu móvel com sobreposição e mantenha botões, formulários e ações confortáveis para toque. Evite larguras rígidas que causem rolagem horizontal da página e preserve a legibilidade de títulos, metadados e mensagens.
>
> Implemente estados visuais consistentes para hover, foco, seleção, item ativo, carregamento, vazio, erro, sucesso e indisponibilidade. Use `:focus-visible` com contorno evidente, rótulos e alvos interativos claros; não remova o indicador de foco. Respeite `prefers-reduced-motion`, usando transições discretas e removendo animações não essenciais quando solicitado pelo sistema.
>
> Suporte temas claro e escuro com cores legíveis e coerentes. Baseie os componentes em variáveis CSS para que o tema, as cores personalizadas, a tipografia e o arredondamento definidos pelo painel administrativo possam ser aplicados dinamicamente sem quebrar os estados dos componentes. Garanta que o texto continue contrastante em cartões, campos, menus, controles de cor, abas, toasts e sobreposições.
>
> Organize os estilos em arquivos separados e complementares: estilos-base para tokens e elementos comuns; estilos de design para autenticação, layout, componentes e responsividade; temas independentes para as variações visuais; e estilos adicionais para recursos administrativos. Evite duplicação desnecessária e dependências CSS externas. Preserve a semântica do HTML e os identificadores/classes usados pelo JavaScript. O resultado deve funcionar diretamente no GitHub Pages, sem build, e não deve sugerir que autenticação ou dados locais de um site estático são seguros ou sincronizados entre dispositivos.
